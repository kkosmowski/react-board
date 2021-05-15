import { ReactElement, useEffect } from 'react';
import { Breadcrumbs as MuiBreadcrumbs } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { NavigateNext } from '@material-ui/icons';
import { Breadcrumb } from '@interfaces';
import { BreadcrumbsState, MainStore } from '@store/interfaces';
import { connect } from 'react-redux';
import { BreadcrumbsService } from '@services';

type BreadcrumbsComponentProps = Pick<BreadcrumbsState, 'breadcrumbs'>

function BreadcrumbsComponent({ breadcrumbs }: BreadcrumbsComponentProps): ReactElement {
  const location = useLocation();

  useEffect(() => {
    BreadcrumbsService.setBreadcrumbs(location.pathname);
  }, [location]);

  const renderBreadcrumbs = (): ReactElement[] => {
    if (breadcrumbs) {
      return breadcrumbs.map(({ name, route }: Breadcrumb, index: number) => {
        if (index !== breadcrumbs.length - 1) {
          return (
            <Link to={ route } key={ index }>{ name }</Link>
          );
        }
        return (
          <span key={ index }>{ name }</span>
        );
      });
    }
    return [];
  };

  return (
    <StyledBreadcrumbs
      separator={ <NavigateNext fontSize="small" /> }
      className="breadcrumbs root-container"
    >
      { renderBreadcrumbs() }
    </StyledBreadcrumbs>
  );
}

const mapStateToProps = ({ breadcrumbs }: MainStore) => ({
  path: breadcrumbs.path,
  breadcrumbs: breadcrumbs.breadcrumbs,
});

const Breadcrumbs = connect(mapStateToProps)(BreadcrumbsComponent);

export { Breadcrumbs };

const StyledBreadcrumbs = styled(MuiBreadcrumbs)`
  height: 40px; // prevent jumping
  padding-top: 16px;

  a {
    color: ${ props => props.theme.palette.secondary.main };
  }
`;
