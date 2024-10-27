package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.ConstructionTaskStaff;
import com.swp_group4.back_end.entities.ConstructionTaskStaffId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConstructionTaskStaffRepository extends JpaRepository<ConstructionTaskStaff, ConstructionTaskStaffId> {

    @Query("SELECT c.id.staffId FROM ConstructionTaskStaff c WHERE c.id.taskId = :taskId")
    List<String> findStaffIdsByTaskId(String taskId);

    @Query("SELECT c.staffName FROM ConstructionTaskStaff c WHERE c.id.taskId = :taskId")
    List<String> findStaffNamesByTaskId(String taskId);

}
