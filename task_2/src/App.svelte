<script lang="ts">
  let curr_from = "USD";
  let curr_to = "RUB";
  let curr_from_value: number = 0;
  let curr_to_value: number = 0;
  let currencyData: { [key: string]: number } = {};
  let currencyCodes: string[] = [];

  const fetchCurrencyData = (base_code: string) => {
    fetch(`https://open.er-api.com/v6/latest/${base_code}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Successful fetch");
        curr_from = data.base_code;
        currencyData = data.rates;
        currencyCodes = Object.keys(currencyData);
      })
      .catch((error) => console.log(error));
  };

  const switchCurrencies = () => {
    fetchCurrencyData(curr_to)
    curr_to = curr_from
  }
  $: curr_to_value = parseFloat(
    (curr_from_value * currencyData[curr_to]).toFixed(2)
  );

  fetchCurrencyData(curr_from);
</script>

<main>
  <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
  <h1>Currency converter</h1>
  <div class="grid">
    <select
      class="select"
      bind:value={curr_from}
      on:change={() => fetchCurrencyData(curr_from)}
    >
      {#each currencyCodes as currency}
        <option value={currency}>
          {currency}
        </option>
      {/each}
    </select>
    <div class="switch-div">
      <button class="button switch" on:click={switchCurrencies}>⇄</button>
    </div>
    <select class="select" bind:value={curr_to}>
      {#each currencyCodes as currency}
        <option value={currency}>
          {currency}
        </option>
      {/each}
    </select>

    <input
      bind:value={curr_from_value}
      class="input"
      type="number"
      step="0.01"
    />
    <input bind:value={curr_to_value} class="input" type="number" step="0.01" />
  </div>
</main>

<style>
  .grid {
    display: grid;
    place-items: center;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 2fr 1fr 2fr;
    gap: 1.5rem;
  }

  .switch-div {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: span 2;
  }
  .button {
    font-size: 1.5rem;
  }
  .input,
  .select {
    border: 0;
    height: 2rem;
    border-radius: 1.5rem;
    padding: 0.2rem 0.5rem;
    font-size: 1rem;
  }
  .switch {
    cursor: pointer;
  }
</style>
