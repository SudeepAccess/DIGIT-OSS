/**
 * eGov suite of products aim to improve the internal efficiency,transparency, 
   accountability and the service delivery of the government  organizations.

    Copyright (C) <2015>  eGovernments Foundation

    The updated version of eGov suite of products as by eGovernments Foundation 
    is available at http://www.egovernments.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see http://www.gnu.org/licenses/ or 
    http://www.gnu.org/licenses/gpl.html .

    In addition to the terms of the GPL license to be adhered to in using this
    program, the following additional terms are to be complied with:

	1) All versions of this program, verbatim or modified must carry this 
	   Legal Notice.

	2) Any misrepresentation of the origin of the material is prohibited. It 
	   is required that all modified versions of this material be marked in 
	   reasonable ways as different from the original version.

	3) This license does not grant any rights to any user of the program 
	   with regards to rights under trademark law for use of the trade names 
	   or trademarks of eGovernments Foundation.

  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */

package org.egov.pims.dao;


import java.util.Date;
import java.util.List;
import java.util.Map;

import org.egov.exceptions.NoSuchObjectException;
import org.egov.exceptions.TooManyValuesException;
import org.egov.pims.model.PersonalInformation;



/**
 * <p>This is an interface which would be implemented by the
 * Individual Frameworks  for all the CRUD (create, read, update, delete) basic data
 * access operations for Property
 *
 * @author deepak
 * @version 2.00
 */
@Deprecated
public interface PersonalInformationDAO extends org.egov.infstr.dao.GenericDAO
{
	public PersonalInformation getPersonalInformationByID(Integer ID) ;
	public Map getAllPIMap();
	public PersonalInformation getPersonalInformationByUserId(Long userId);
	public void deleteLangKnownForEmp(PersonalInformation personalInformation);
	public List getListOfPersonalInformationByEmpIdsList(List empIdsList);
	public PersonalInformation getEmployee(Integer deptId, Integer designationId, Long Boundaryid)throws TooManyValuesException, NoSuchObjectException;
	public PersonalInformation getEmployeeByFunctionary(Long deptId, Long designationId, Long Boundaryid,Integer functionaryId)throws TooManyValuesException, NoSuchObjectException;
	public List getListOfUsersForGivenBoundaryId(Long boundaryId) throws NoSuchObjectException;
	/**
	  * Returning temporary  assigned employee object by pepartment,designation,functionary,date 
	  * @param deptId
	  * @param DesigId
	  * @param functionaryId
	  * @param onDate
	  * @return Employee
	  * @throws Exception 
	  */
	 public PersonalInformation getTempAssignedEmployeeByDeptDesigFunctionaryDate(Integer deptId, Integer desigId, Integer functionaryId, Date onDate) throws Exception;
	 
	 public abstract List getAllDesignationByDept(Integer deptId)throws TooManyValuesException, NoSuchObjectException;
	 public abstract List getAllActiveUsersByGivenDesg(Integer DesgId)throws Exception;
	 public List<PersonalInformation> getAllEmpByGrade(Integer gradeId) throws Exception;
	 public List getListOfUsersNotMappedToEmp() throws Exception;
}
