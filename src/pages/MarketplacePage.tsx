import { useAppState } from '../context/AppStateContext';

const rarityLabel: Record<string, string> = {
  Comum: 'badge--common',
  Raro: 'badge--rare',
  Épico: 'badge--epic',
};

const MarketplacePage = () => {
  const { marketplace, wishlist, addToWishlist } = useAppState();

  return (
    <div className="page">
      <section className="card">
        <header className="card__header">
          <div>
            <h1>Loja</h1>
            <p>Visual futurista para o seu avatar: avatares, roupas e acessórios.</p>
          </div>
        </header>
        <div className="shop-grid">
          {marketplace.map((item) => (
            <article key={item.id} className="shop-card">
              <div className={`shop-card__rarity ${rarityLabel[item.rarity]}`}>{item.rarity}</div>
              <div className="shop-card__visual" aria-hidden>
                <div className="shop-card__gradient" />
              </div>
              <h2>{item.name}</h2>
              <span className="shop-card__type">{item.type}</span>
              <p>{item.description}</p>
              <button
                type="button"
                className="button button--primary"
                onClick={() => addToWishlist(item.id)}
                disabled={wishlist.includes(item.id)}
              >
                {wishlist.includes(item.id) ? 'Na lista de desejos' : 'Adicionar à lista de desejos'}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MarketplacePage;
