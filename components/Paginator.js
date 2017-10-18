import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import qs from 'qs';
import {withRouter} from 'react-router-dom';

const Paginator = ({search, total, current, history}) => (
  <nav>
    <Pagination>
      <PaginationItem disabled={current === 1}>
        <PaginationLink previous
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          history.push({
                            search: qs.stringify({
                              ...search,
                              page: Math.max(current - 1, 1)
                            })
                          });
                        }}>Prev</PaginationLink>
      </PaginationItem>

      {
        Array(Math.max(total, 1)).fill().map((x, page) =>
          <PaginationItem key={page} active={current === page + 1}>
            <PaginationLink href="" onClick={(e) => {
              e.preventDefault();
              history.push({search: qs.stringify({...search, page: page + 1})})
            }}>{page + 1}</PaginationLink>

          </PaginationItem>
        )
      }

      <PaginationItem disabled={current >= total}>
        <PaginationLink next
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          history.push({
                            search: qs.stringify({
                              ...search,
                              page: Math.min(current + 1, total)
                            })
                          });
                        }}>Next</PaginationLink>
      </PaginationItem>
    </Pagination>
  </nav>
);

export default withRouter(Paginator);
