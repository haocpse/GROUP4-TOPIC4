package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.ConstructionTasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConstructionTasksRepository extends JpaRepository<ConstructionTasks, String> {

    List<ConstructionTasks> findByConstructionOrderId(String id);

}
