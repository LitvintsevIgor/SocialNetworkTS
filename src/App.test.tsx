import React from 'react';
import ReactDOM from 'react-dom';
import SocialNetworkApp from "./App";

// test('renders learn react link', () => {
//   render(<SocialNetworkApp />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SocialNetworkApp />, div);
  ReactDOM.unmountComponentAtNode((div))
});
