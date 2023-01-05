const Header = ({ showNav, setShowNav }) => {
  return <header
    id="header"
    className={`header${showNav ? ' body-pd' : ''}`}>
    <div className="header_toggle">
      <i
        id="header-toggle"
        className={`bi ${showNav ? 'bi-chevron-left' : 'bi-list'}`}
        onClick={() => setShowNav(!showNav)}
      />
    </div>
  </header>
}

export default Header;