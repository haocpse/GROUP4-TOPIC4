package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {

    Optional<Staff> findByAccountId(String accountId);
    List<Staff> findByAccountIdIsNull();
}
