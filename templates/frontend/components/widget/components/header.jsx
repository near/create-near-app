const Navbar = styled.div`
  width: 64px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  width: 100%;

  background-color: #0b0c14;
  border-bottom: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2));
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    a {
      display: flex;
    }
  }
`;

const Button = styled.button``;

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const NavLink = ({ to, children }) => (
  <div></div>
);

const [showMenu, setShowMenu] = useState(false);
const toggleDropdown = () => setShowMenu(!showMenu);

const AppHeader = ({ page, routes, ...props }) => (
  <Navbar>
      <img
        style={{ width: 85, objectFit: "cover" }}
        src="https://storage.googleapis.com/media.urbit.org/logo/White/~-logo-white-medium.png"
      />
    <ButtonGroup style={{ flex: 1 }}>
      {routes &&
        (Object.keys(routes) || []).map((k) => {
          const route = routes[k];
          if (route.hide) {
            return null;
          }
          return (
            <NavLink to={k}>
              <Button key={k}>
                {route.init.icon && <i className={route.init.icon}></i>}
                {route.init.name}
              </Button>
            </NavLink>
          );
        })}
    </ButtonGroup>
  </Navbar>
);

return <AppHeader page={props.page} routes={props.routes} {...props} />;
