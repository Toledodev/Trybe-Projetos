import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

setCategories = async () => {
  const { handleRadio } = this.props;
  const categories = await getCategories();
  const elements = categories.map((element) => (
    <label htmlFor={ element.id } key={ element.id }>
      { element.name }
      <input
        data-testid="category"
        type="radio"
        name="category"
        id={ element.id }
        onClick={ () => handleRadio(element.id) }
        // value={ selectCategory }
      />
    </label>
  ));
  this.setState({ categories: elements });
}

componentDidMount = () => {
  this.setCategories();
}

render() {
  const { categories } = this.state;
  return (
    <aside>
      <h2>Categorias</h2>
      <form>
        {categories}
      </form>
    </aside>
  );
}
}

Sidebar.propTypes = {
  handleRadio: PropTypes.func.isRequired,
};

export default Sidebar;
