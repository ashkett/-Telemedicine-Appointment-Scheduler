import React, { useState } from "react";
import "../assets/scss/sidebar.css"; // Assuming you have CSS for the sidebar.

const Sidebar = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [menuKey]: !prevState[menuKey],
    }));
  };

  return (
    <div className={`layout has-sidebar fixed-sidebar fixed-header ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <aside id="sidebar" className="sidebar break-point-sm has-bg-image">
        <button id="btn-collapse" className="sidebar-collapser" onClick={toggleSidebar}>
          <i className={`ri-arrow-${isSidebarCollapsed ? "right" : "left"}-s-line`}></i>
        </button>
        <div className="image-wrapper">
          <img src="assets/images/sidebar-bg.jpg" alt="sidebar background" />
        </div>
        <div className="sidebar-layout">
          <div className="sidebar-header">
            <div className="pro-sidebar-logo">
              <div>P</div>
              <h5>Pro Sidebar</h5>
            </div>
          </div>
          <div className="sidebar-content">
            <nav className="menu open-current-submenu">
              <ul>
                <li className="menu-header"><span> GENERAL </span></li>
                <li className={`menu-item sub-menu ${openSubmenus["components"] ? "open" : ""}`}>
                  <a href="#" onClick={() => toggleSubmenu("components")}>  
                    <span className="menu-icon">
                      <i className="ri-vip-diamond-fill"></i>
                    </span>
                    <span className="menu-title">Components</span>
                    <span className="menu-suffix">
                      <span className="badge primary">Hot</span>
                    </span>
                  </a>
                  {openSubmenus["components"] && (
                    <div className="sub-menu-list">
                      <ul>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Grid</span>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Layout</span>
                          </a>
                        </li>
                        <li className={`menu-item sub-menu ${openSubmenus["forms"] ? "open" : ""}`}>
                          <a href="#" onClick={() => toggleSubmenu("forms")}>
                            <span className="menu-title">Forms</span>
                          </a>
                          {openSubmenus["forms"] && (
                            <div className="sub-menu-list">
                              <ul>
                                <li className="menu-item">
                                  <a href="#">
                                    <span className="menu-title">Input</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="#">
                                    <span className="menu-title">Select</span>
                                  </a>
                                </li>
                                <li className={`menu-item sub-menu ${openSubmenus["more"] ? "open" : ""}`}>
                                  <a href="#" onClick={() => toggleSubmenu("more")}>
                                    <span className="menu-title">More</span>
                                  </a>
                                  {openSubmenus["more"] && (
                                    <div className="sub-menu-list">
                                      <ul>
                                        <li className="menu-item">
                                          <a href="#">
                                            <span className="menu-title">CheckBox</span>
                                          </a>
                                        </li>
                                        <li className="menu-item">
                                          <a href="#">
                                            <span className="menu-title">Radio</span>
                                          </a>
                                        </li>
                                        <li className={`menu-item sub-menu ${openSubmenus["want-more"] ? "open" : ""}`}>
                                          <a href="#" onClick={() => toggleSubmenu("want-more")}>
                                            <span className="menu-title">Want more?</span>
                                            <span className="menu-suffix">&#x1F914;</span>
                                          </a>
                                          {openSubmenus["want-more"] && (
                                            <div className="sub-menu-list">
                                              <ul>
                                                <li className="menu-item">
                                                  <a href="#">
                                                    <span className="menu-prefix">&#127881;</span>
                                                    <span className="menu-title">You made it</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          )}
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Add similar toggling logic for other menu items here */}
              </ul>
            </nav>
          </div>
          <div className="sidebar-footer">
            <div className="footer-box">
              <div>
                <img
                  className="react-logo"
                  src="https://user-images.githubusercontent.com/25878302/213938106-ca8f0485-3f30-4861-9188-2920ed7ab284.png"
                  alt="react"
                />
              </div>
              <div style={{ padding: "0 10px" }}>
                <span style={{ display: "block", marginBottom: "10px" }}>
                  Pro sidebar is also available as a React package
                </span>
                <div style={{ marginBottom: "15px" }}>
                  <img
                    alt="preview badge"
                    src="https://img.shields.io/github/stars/azouaoui-med/react-pro-sidebar?style=social"
                  />
                </div>
                <div>
                  <a href="https://github.com/azouaoui-med/react-pro-sidebar" target="_blank" rel="noreferrer">
                    Check it out!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div id="overlay" className="overlay"></div>
      <div className="layout">
        <main className="content">
          <div>
            <button id="btn-toggle" className="sidebar-toggler break-point-sm" onClick={toggleSidebar}>
              <i className="ri-menu-line ri-xl"></i>
            </button>
            <h1 style={{ marginBottom: "0" }}>Pro Sidebar</h1>
            <span style={{ display: "inline-block" }}>
              Responsive layout with advanced sidebar menu built with SCSS and vanilla Javascript
            </span>
            <br />
            <span>
              Full Code and documentation available on
              <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank" rel="noreferrer">
                Github
              </a>
            </span>
            <div style={{ marginTop: "10px" }}>
              <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank" rel="noreferrer">
                <img
                  alt="GitHub stars"
                  src="https://img.shields.io/github/stars/azouaoui-med/pro-sidebar-template?style=social"
                />
              </a>
              <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank" rel="noreferrer">
                <img
                  alt="GitHub forks"
                  src="https://img.shields.io/github/forks/azouaoui-med/pro-sidebar-template?style=social"
                />
              </a>
            </div>
          </div>
          <div>
            <h2>Features</h2>
            <ul>
              <li>Fully responsive</li>
              <li>Collapsable sidebar</li>
              <li>Multi level menu</li>
              <li>RTL support</li>
              <li>Customizable</li>
            </ul>
          </div>
          <div>
            <h2>Resources</h2>
            <ul>
              <li>
                <a target="_blank" href="https://github.com/azouaoui-med/css-pro-layout" rel="noreferrer">
                  Css Pro Layout
                </a>
              </li>
              <li>
                <a target="_blank" href="https://github.com/popperjs/popper-core" rel="noreferrer">
                  Popper Core
                </a>
              </li>
              <li>
                <a target="_blank" href="https://remixicon.com/" rel="noreferrer">
                  Remix Icons
                </a>
              </li>
            </ul>
          </div>
          <footer className="footer">
            <small style={{ marginBottom: "20px", display: "inline-block" }}>
              © 2023 made with
              <span style={{ color: "red", fontSize: "18px" }}>❤️</span> by -
              <a target="_blank" href="https://azouaoui.netlify.com" rel="noreferrer">
                Mohamed Azouaoui
              </a>
            </small>
            <br />
            <div className="social-links">
              <a href="https://github.com/azouaoui-med" target="_blank" rel="noreferrer">
                <i className="ri-github-fill ri-xl"></i>
              </a>
              <a href="https://twitter.com/azouaoui_med" target="_blank" rel="noreferrer">
                <i className="ri-twitter-fill ri-xl"></i>
              </a>
              <a href="https://codepen.io/azouaoui-med" target="_blank" rel="noreferrer">
                <i className="ri-codepen-fill ri-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/mohamed-azouaoui/" target="_blank" rel="noreferrer">
                <i className="ri-linkedin-box-fill ri-xl"></i>
              </a>
            </div>
          </footer>
        </main>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default Sidebar;
