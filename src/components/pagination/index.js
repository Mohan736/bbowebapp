import { memo } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";


const Pagination = ({ className, setPage, count, pageSize, page }) => {
  const tempCount = Math.ceil(count / pageSize);

  const handlePageClick = (data) => {
    setPage(data?.selected + 1);
  };

  return (
    <>
      {tempCount > 1 && (
        <div className={`className ${className}`} id="paginationDiv">
          <ReactPaginate
            forcePage={page - 1}
            previousLabel={<img src="" alt="" />}
            nextLabel={<img src="" alt="" />}
            breakLabel={"..."}
            pageCount={tempCount}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={style.pagination}
            pageClassName={style.pageItem}
            pageLinkClassName={style.pageLink}
            previousClassName={style.previousNext}
            previousLinkClassName={style.previousNext}
            nextClassName={style.previousNext}
            nextLinkClassName={style.previousNext}
            breakClassName={style.breakLink}
            breakLinkClassName={style.breakLink}
            activeClassName={style.active}
            activeLinkClassName={style.active}
          />
        </div>
      )}
    </>
  );
};

export default memo(Pagination);
