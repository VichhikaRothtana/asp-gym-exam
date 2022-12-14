const Search = () => {
  const handleCloseSearch = () => {
    $('.search-model').fadeOut(400, function () {
      $('#search-input').val('')
    })
  }
  return (
    <div className="search-model">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="search-close-switch" onClick={handleCloseSearch}>
          +
        </div>
        <form className="search-model-form">
          <input type="text" id="search-input" placeholder="Search here....." />
        </form>
      </div>
    </div>
  )
}

export default Search
