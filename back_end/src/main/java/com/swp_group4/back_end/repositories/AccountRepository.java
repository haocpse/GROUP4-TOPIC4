package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.Account;
import com.swp_group4.back_end.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByUsername(String username);
    List<Account> findByRole(Role role);
    List<Account> findByRoleNotIn(List<Role> roles);
    Account findByGoogleId(String googleId);
}
