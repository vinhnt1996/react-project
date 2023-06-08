import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { fetchUser } from "./services/fetchUser";
import ReactPaginate from "react-paginate";
import ModalComponent from "./ModalComponent";
import ModalEditComponent from "./ModalEditComponent";
import ModalDeleteComponent from "./ModalDeleteComponent";
const TableUserListComponent = () => {
  const [listUser, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
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
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUser]);
  };
  const handleEditUser = (user) => {
    setIsShowModalEdit(true);
    setDataUserEdit(user);
  };
  const handleEditUserFromModal = (user) => {
    let listUserCopy = [...listUser];
    let index = listUser.findIndex((item) => item.id === user.id);
    listUserCopy[index].first_name = user.first_name;
    setListUsers(listUserCopy);
  };
  const handleDeleteUser = (item) => {
    setIsShowModalDelete(true);
    setDataUserDelete(item);
  };
  const handleDeleteUserFromModal = (user) => {
    let listUserCopy = [...listUser];
    listUserCopy = listUserCopy.filter((item) => item.id !== user.id);
    setListUsers(listUserCopy);
  };
  return (
    <>
      <div className="block-header">
        <span>
          <b>List Users:</b>
        </span>
        <button className="btn btn-success my-1" onClick={handleShow}>
          Add Member
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>EMAIL</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>Action</th>
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
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
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
      <ModalComponent
        show={show}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      ></ModalComponent>
      <ModalEditComponent
        show={isShowModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      ></ModalEditComponent>
      <ModalDeleteComponent
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      ></ModalDeleteComponent>
    </>
  );
};
export default TableUserListComponent;
