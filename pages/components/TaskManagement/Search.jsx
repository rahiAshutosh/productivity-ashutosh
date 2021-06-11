import React from "react";
import { string, func } from "prop-types";

const Search = ({
  searchQuery,
  handleChangeQuery
}) => {
  return (
    <div className="search-area">
      <input
        placeholder="Filter Issues"
        value={searchQuery}
        onChange={handleChangeQuery}
      />
    </div>
  );
};

Search.propTypes = {
  searchQuery: string,
  handleChangeQuery: func.isRequired
};

Search.defaultProps = {
  searchQuery: ''
};

export default Search;