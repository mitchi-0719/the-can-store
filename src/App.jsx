import { useState, useEffect } from "react";

async function fetchCans() {
  const url = "products.json";
  const response = await fetch(url);
  return response.json();
}

export default function App() {
  const [cans, setCans] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    (async () => {
      const newContents = await fetchCans();
      setCans(newContents);
    })();
  }, []);

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSelectCategory(e.target.category.value.toLowerCase());
              setSearchKeyword(e.target.searchTerm.value);
            }}
          >
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select id="category" name="category">
                <option>All</option>
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input
                type="text"
                id="searchTerm"
                name="searchTerm"
                placeholder="e.g. beans"
              />
            </div>
            <div>
              <button type="submit">Filter results</button>
            </div>
          </form>
        </aside>
        <main>
          {cans
            .filter(
              (can) =>
                (selectCategory === "all" || can.type === selectCategory) &&
                can.name.includes(searchKeyword)
            )
            .map((can, index) => {
              return (
                <section className={can.type} key={index}>
                  <h2>{can.name}</h2>
                  <p>${can.price}</p>
                  <img src={`images/${can.image}`} alt={can.name} />
                </section>
              );
            })}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}
