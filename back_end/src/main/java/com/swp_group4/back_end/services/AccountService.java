package com.swp_group4.back_end.services;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.swp_group4.back_end.entities.Account;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.Role;
import com.swp_group4.back_end.exception.AppException;
import com.swp_group4.back_end.exception.ErrorCode;
import com.swp_group4.back_end.repositories.AccountRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.StaffRepository;
import com.swp_group4.back_end.requests.CreateAccountForStaffRequest;
import com.swp_group4.back_end.requests.CreateAccountRequest;
import com.swp_group4.back_end.requests.LoginRequest;
import com.swp_group4.back_end.requests.LoginWithGoogleRequest;
import com.swp_group4.back_end.responses.AccountResponse;
import com.swp_group4.back_end.responses.LoginResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountService {

    @Autowired
    AccountRepository accountRepository;
    @Autowired
    @Lazy
    CustomerService customerService;

    @NonFinal
    @Value("${jwt.SIGNER_KEY}")
    String SIGNER_KEY;
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private CustomerRepository customerRepository;

    public LoginResponse login (LoginRequest request) {
        String userName = request.getUsername();
        String password = request.getPassword();
        Account acc = accountRepository.findByUsername(userName).orElseThrow(()
                                                                -> new AppException(ErrorCode.USER_NOT_EXIST));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if (!passwordEncoder.matches(password, acc.getPassword())) {
            throw new AppException(ErrorCode.PASSWORD_WRONG);
        }
        String token = generateToken(acc);
        return LoginResponse.builder()
                .token(token)
                .role(acc.getRole())
                .build();
    }

    public Account register(CreateAccountRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        Account acc = Account.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CUSTOMER)
                .isActive(true)
                .build();
        accountRepository.save(acc);
        customerService.createCustomer(acc.getAccountId(), request);
        return acc;
    }

    public String generateToken(Account acc){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(acc.getAccountId())
                .issuer("swp_group4")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .claim("scope",buildScope(acc))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    private String buildScope(Account acc){
        StringJoiner joiner = new StringJoiner(" ");
        joiner.add(acc.getRole().name());
        return joiner.toString();
    }

    public Account createStaff(@Valid CreateAccountForStaffRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        Account acc = Account.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        accountRepository.save(acc);
        Staff staff = Staff.builder()
                .accountId(acc.getAccountId())
                .staffName(request.getStaffName())
                .build();
        staffRepository.save(staff);
        return acc;
    }

    public AccountResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        Account account = accountRepository.findById(accountId).orElseThrow();
        return AccountResponse.builder()
                .accountId(accountId)
                .role(account.getRole())
                .build();
    }

    public LoginResponse loginGoogle(LoginWithGoogleRequest request) {
        Account account = accountRepository.findByGoogleId(request.getSub());
        if (account == null) {
            Account newAccount = Account.builder()
                    .googleId(request.getSub())
                    .username(request.getEmail())
                    .role(Role.CUSTOMER)
                    .isActive(true)
                    .build();
            accountRepository.save(newAccount);
            account = newAccount;
            Customer customer = Customer.builder()
                    .firstName(request.getName())
                    .accountId(newAccount.getAccountId())
                    .build();
            customerRepository.save(customer);
        }
        return LoginResponse.builder()
                .token(generateToken(account))
                .role(account.getRole())
                .build();
    }


//    public String logout(){
//
//    }

}
