import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
const form = document.querySelector("#search-location");
const input = form.querySelector("#default-search");
const weatherCardContainer = document.querySelector(".weather-card");
const detectLoc = document.querySelector(".detect-loc");
const apiKey = `66cf454502d3c20bdc15c6b72d51302d`;
let url;

// wether card ui
const weatherCard = (res) => {
  const { name, weather, main, wind } = res;
  const data = `<div class="flex justify-center">
  <div
    class="card min-w-sm max-w-sm border border-gray-100 bg-gray-50 transition-shadow test shadow-lg hover:shadow-shadow-xl w-full bg-green-600 text-purple-50 rounded-md"
  >
    <h2 class="text-md mb-2 px-4 pt-4">
      <div class="flex justify-between">
        <div class="badge relative top-0">
          <span
            class="mt-2 py-1 h-12px text-md font-semibold w-12px rounded right-1 bottom-1 px-4"
            >${name}</span
          >
        </div>
        <span class="text-lg font-bold"
          >${new Date().toLocaleTimeString()}</span
        >
      </div>
    </h2>

    <div class="flex items-center p-4">
      <div class="flex flex-col justify-center items-center w-96">
        <h1 class="text-5xl">${main.temp}°</h1>
        <span
          >${weather[0].main}
          ${main.temp_max}°/${main.temp_min}°</span
        >
      </div>
      <div class="border-l-2 h-20"></div>
      <div class="flex justify-center items-center w-96">
        <img
          src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"
          alt=""
          srcset=""
          class="h-32 w-32 text-yellow-300"
        />
      </div>
    </div>
    <div class="text-md pt-4 pb-4 px-4">
      <div class="flex justify-between items-center">
        <div class="space-y-2">
          <span class="flex space-x-2 items-center"
            ><svg
              height="20"
              width="20"
              viewBox="0 0 32 32"
              class="fill-current"
            >
              <path
                d="M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"
              ></path>
              <path
                d="M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"
              ></path>
            </svg>
            <span>${wind.speed}km/h</span></span
          ><span class="flex space-x-2 items-center"
            ><svg
              height="20"
              width="20"
              viewBox="0 0 32 32"
              class="fill-current"
            >
              <path
                d="M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z"
              ></path>
              <path
                d="M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,9.0114,9.0114,0,0,1,16,28ZM16,5.8483l-5.7817,9.2079A7.9771,7.9771,0,0,0,9,19a7,7,0,0,0,14,0,8.0615,8.0615,0,0,0-1.248-3.9953Z"
              ></path>
            </svg>
            <span>${main.humidity}%</span></span
          >
        </div>
        <div class="flex flex-col justify-center items-center">
          <h1 class="text-4xl">${main.feels_like}°</h1>
          <span>Feels like</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
  weatherCardContainer.innerHTML = data;
};

const setApiByName = (loc) => {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${apiKey}`;
};
const setApiByCords = (lat, long) => {
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
};

// fetches wether data and displays the wether card
const fetchWeather = async () => {
  try {
    const fetchWeather = await fetch(url);
    const weatherData = await fetchWeather.json();
    console.log(weatherData);
    weatherCard(weatherData);
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

// sets api url and fetch wether by location name
const getWeatherByName = async (location) => {
  await setApiByName(location);
  await fetchWeather();
};

// sets api url and fetch wether by coordinates
const getWeatherByCords = async (lat, long) => {
  await setApiByCords(lat, long);
  await fetchWeather();
};

// fetch location cordinates
const detectCords = () => {
  console.log(navigator.geolocation);
  navigator.geolocation.getCurrentPosition((position) => {
    getWeatherByCords(position.coords.latitude, position.coords.longitude);
  });
};

// input form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputLocation = input.value;
  getWeatherByName(inputLocation);
});

// detect location event
detectLoc.addEventListener("click", (e) => {
  e.preventDefault();
  detectCords();
});
detectCords();



const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Data to enrich your online business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
