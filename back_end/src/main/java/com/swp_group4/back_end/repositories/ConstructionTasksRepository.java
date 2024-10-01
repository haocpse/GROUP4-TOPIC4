package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.ConstructionTasks;
import com.swp_group4.back_end.enums.ConstructStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConstructionTasksRepository extends JpaRepository<ConstructionTasks, String> {

    List<ConstructionTasks> findByConstructionOrderId(String id);
    ConstructionTasks findByConstructionOrderIdAndTaskId(String id, String taskId);
    List<ConstructionTasks> findByStatus(ConstructStatus status);
    List<ConstructionTasks> findByConstructionOrderIdAndStatusIn(String id, List<ConstructStatus> statuses);
}
