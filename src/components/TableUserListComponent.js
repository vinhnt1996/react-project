import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { fetchUser } from "./services/fetchUser";
import ReactPaginate from "react-paginate";
const TableUserListComponent = () => {
  const [listUser, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getListUser(1);
  }, []);

  const getListUser = async (page) => {
    try {
      let res = await fetchUser(page);
      if (res && res.data && res.data.data.length > 0) {
        setListUsers(res.data.data);
        setTotalUsers(res.data.total);
        setTotalPages(res.data.total_pages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageClick = (event) => {
    getListUser(+event.selected + 1);
    console.log("value of", event);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>EMAIL</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};
export default TableUserListComponent;
