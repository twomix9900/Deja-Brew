
var BreweryListEntry = ({Brewery}) => (
  <div>
    {Brewery.id}

    {/*<div className="media-left media-middle">
      <img className="media-object" src={Brewery.snippet.thumbnails.default.url} alt="" />
    </div>
    <div className="media-body">
      <div 
        className="Brewery-list-entry-title"
        onClick={() => handleBreweryListEntryTitleClick(Brewery)}
      >
        {Brewery.snippet.title}
      </div>
      <div className="Brewery-list-entry-detail">{Brewery.snippet.description}</div>
    </div>*/}
  </div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
BreweryListEntry.propTypes = {
  Brewery: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.BreweryListEntry = BreweryListEntry;
