import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Properties from "./pages/Propetries/Properties";
import LoginPage from "./pages/LoginPage/LoginPage";
import ListProperties from "./components/ListProperties/ListProperties";
import ShowDetails from "./pages/ShowDetails/ShowDetails";
import Profile from "./components/Profile/Profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setWishlistData,
  wishlistSlice,
} from "./faetures/Wishlist/WishlistSlice";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(
          `http://localhost:8000/wishlist/${user?.id}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch wishlist: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data) {
          dispatch(setWishlistData(data.wishlist));
          console.log("Fetched wishlist:", data.wishlist);
        } else {
          console.warn("No wishlist data found");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [
    dispatch,
    user?.id,
    useSelector((state) => state.wishlist.wishlistUpdated),
  ]);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/properties-list"
            element={<Properties title="Find Hostel, Flats, PG For Rent" />}
          />
          <Route
            path="/hostel-pg-flats/:city"
            element={<Properties title="Find Hostel, Flats, PG For Rent in" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="list-your-properties" element={<ListProperties />} />
          <Route path="/search" element={<Properties />} />
          <Route path="/property/:id" element={<ShowDetails />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
