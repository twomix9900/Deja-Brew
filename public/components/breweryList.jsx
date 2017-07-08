
var breweryList = ({breweries}) => (
  <div>
    {breweries.map((brewery) =>
      <breweryListEntry
        brewery={brewery}
      />
    )}
  </div>
);

// // PropTypes tell other developers what `props` a component expects
// // Warnings will be shown in the console when the defined rules are violated
breweryList.propTypes = {
  breweries: React.PropTypes.array.isRequired
};

// // In the ES6 spec, files are "modules" and do not share a top-level scope.
// // `var` declarations will only exist globally where explicitly defined.
window.breweryList = breweryList;