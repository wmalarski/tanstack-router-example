import type { Beer } from "@services/types";
import { Link } from "@tanstack/react-router";

type BeerListItemProps = {
  beer: Beer;
};

export const BeerListItem = ({ beer }: BeerListItemProps) => {
  return (
    <li>
      <img src={beer.image_url} />
      <Link to="/beers/$id" params={{ id: beer.id }}>
        <h2>{beer.name}</h2>
      </Link>
      <span>{beer.description}</span>
      <details>
        <summary>More</summary>
        <pre>{JSON.stringify(beer, null, 2)}</pre>
      </details>
    </li>
  );
};
