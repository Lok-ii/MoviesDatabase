/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainText: "#fff",
        hoverText: '#DA2F68',
        backgroundColor: '#04152D',
        extraTextColor: '#04152D',
        lightBackground:  'rgba(3, 9, 27, .5)',
        pinkText: "#da2f68",
      },
      backgroundImage : {
        gradientImage: `linear-gradient(transparent 10%, #04152D 90%), url("https://image.tmdb.org/t/p/original/meyhnvssZOPPjud4F1CjOb4snET.jpg")`,
        buttonGradient: 'linear-gradient(98.37deg, #f89e00 .99%, #da2f68 100%)',
      }
    },
  },
  plugins: [],
};
