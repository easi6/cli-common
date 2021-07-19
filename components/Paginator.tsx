import React from 'react';

import qs from 'qs';
import { useHistory } from 'react-router';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { Desktop, Mobile } from './ByScreen';
import { useSearch } from '../../hooks/router';

export const splitPagesToLimit = (total: number, current: number, limit: number = 5) => {
  let pages: Array<string | number> = [1];
  if (total <= 1) {
    return pages;
  }

  if (total <= limit + 1) {
    pages = Array(total)
      .fill(undefined)
      .map((val, page) => page + 1);
  } else {
    // total > limit. need to truncate
    const offset = Math.floor(limit / 2);
    if (current + offset - 1 <= limit) {
      // truncate tail
      const head = Array(limit)
        .fill(undefined)
        .map((val, page) => page + 1);
      pages = [...head, '...', total];
    } else if (current + offset + 1 >= total) {
      // truncate head
      const tail = Array(limit)
        .fill(undefined)
        .map((val, page) => total - (limit - (page + 1)));
      pages = [1, '...', ...tail];
    } else {
      // truncate both head and tail
      const centers = Array(limit)
        .fill(undefined)
        .map((val, page) => current - (offset - page));
      pages = [1, '...', ...centers, '...', total];
    }
  }

  return pages;
};

interface OnClick {
  page?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, page: number) => void;
  next?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  previous?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

interface PaginatorProps {
  total: number;
  current: number;
  onClick?: OnClick;
  pageKey?: string;
}

const Paginator = ({ total, current, onClick = {}, pageKey = 'page' }: PaginatorProps) => {
  const search = useSearch();
  const history = useHistory();

  const renderPages = (length: number) => {
    const pages = splitPagesToLimit(Number(total), Number(current), length);

    return pages.map((page, idx) => (
      <PaginationItem key={idx} active={Number(current) === page} disabled={page === '...'}>
        <PaginationLink
          href=''
          onClick={(e) => {
            e.preventDefault();
            //@ts-ignore
            e.target.blur();

            if (onClick.page) {
              return onClick.page(e, page as number);
            }

            history.push({ search: qs.stringify({ ...search, [pageKey]: page }) });
          }}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <nav>
      <Pagination size={'sm'}>
        <PaginationItem disabled={current === 1}>
          <PaginationLink
            previous
            href=''
            onClick={(e) => {
              e.preventDefault();

              if (onClick.previous) {
                return onClick.previous(e);
              }

              history.push({
                search: qs.stringify({
                  ...search,
                  [pageKey]: Math.max(current - 1, 1),
                }),
              });
            }}
          >
            <Desktop>Prev</Desktop>
            <Mobile>&#x2190;</Mobile>
          </PaginationLink>
        </PaginationItem>
        <Desktop>{renderPages(5)}</Desktop>
        <Mobile>{renderPages(2)}</Mobile>
        <PaginationItem disabled={current >= total}>
          <PaginationLink
            next
            href=''
            onClick={(e) => {
              e.preventDefault();

              if (onClick.next) {
                return onClick.next(e);
              }

              history.push({
                search: qs.stringify({
                  ...search,
                  [pageKey]: Math.min(current + 1, total),
                }),
              });
            }}
          >
            <Desktop>Next</Desktop>
            <Mobile>&#x2192;︎︎</Mobile>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  );
};

export default Paginator;
