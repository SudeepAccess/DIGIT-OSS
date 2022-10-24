package org.egov.land.abm.repo;

import java.util.List;

import org.egov.land.abm.newservices.entity.NewServiceInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NewServiceInfoRepo extends JpaRepository<NewServiceInfo, Long> {

	@Query(value="select n.id from NewServiceInfo n")
	public List<String> getApplicantsNumber();
}
