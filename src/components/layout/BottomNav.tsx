import { NavLink } from 'react-router-dom';
import { bottomNavigation } from '../../constants';
import Icon from '../Icon';

const BottomNav = () => {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {bottomNavigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`
          }
        >
          <Icon name={item.icon} size={22} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
