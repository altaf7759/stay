import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertyType: "",
  title: "",
  description: "",
  isPropertyDetails: false,
  city: "",
  area: "",
  landmark: "",
  pincode: "",
  isLocationDetails: false,
  rent: "",
  deposite: "",
  electricityBill: false,
  waterBill: false,
  internetBill: false,
  maintenance: null,
  isRentDetails: false,
  furnishingStatus: "",
  occupancyType: "",
  facilities: {
    parking: "",
    cctv: "",
    laundry: "",
    ac: "",
    cooler: "",
    geyser: "",
    gym: "",
    lift: "",
    powerBackup: "",
  },
  isPropertyFeatures: false,
  tenantPreference: "",
  genderPreference: "",
  smokingAllowed: "",
  petsAllowed: "",
  alcoholAllowed: "",
  isRules: false,
  ownerName: "",
  phoneNumber: "",
  email: "",
  isContact: false,
  images: [],
  video: null,
  isMedias: false,
};

export const propertySlice = createSlice({
  name: "property-form-data",
  initialState,
  reducers: {
    setPropertyDetails: (state, action) => {
      state.propertyType = action.payload.propertyType;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.isPropertyDetails = action.payload.isPropertyDetails;
    },
    setLocationDetails: (state, action) => {
      state.city = action.payload.city;
      state.area = action.payload.area;
      state.landmark = action.payload.landmark;
      state.pincode = action.payload.pincode;
      state.isLocationDetails = action.payload.isLocationDetails;
    },
    setRentAndBilling: (state, action) => {
      state.rent = action.payload.rent;
      state.deposite = action.payload.deposite;
      state.electricityBill = action.payload.electricityBill;
      state.waterBill = action.payload.waterBill;
      state.internetBill = action.payload.internetBill;
      state.maintenance = action.payload.maintenance;
      state.isRentDetails = action.payload.isRentDetails;
    },
    setPropertyFeatures: (state, action) => {
      state.furnishingStatus = action.payload.furnishingStatus;
      state.occupancyType = action.payload.occupancyType;
      state.facilities.parking = action.payload.parking;
      state.facilities.ac = action.payload.ac;
      state.facilities.cctv = action.payload.cctv;
      state.facilities.cooler = action.payload.cooler;
      state.facilities.geyser = action.payload.geyser;
      state.facilities.laundry = action.payload.laundry;
      state.isPropertyFeatures = action.payload.isPropertyFeatures;
      state.facilities.gym = action.payload.gym;
      state.facilities.lift = action.payload.lift;
      state.facilities.powerBackup = action.payload.powerBackup;
    },
    setRulesAndRestrictions: (state, action) => {
      state.tenantPreference = action.payload.tenantPreference;
      state.genderPreference = action.payload.genderPreference;
      state.smokingAllowed = action.payload.smokingAllowed;
      state.alcoholAllowed = action.payload.alcoholAllowed;
      state.petsAllowed = action.payload.petsAllowed;
      state.isRules = action.payload.isRules;
    },
    setContactInfo: (state, action) => {
      state.ownerName = action.payload.ownerName;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      state.isContact = action.payload.isContact;
    },
    setImagesAndMedia: (state, action) => {
      state.images = action.payload.images;
      state.video = action.payload.video;
      state.isMedias = action.payload.isMedias;
    },
    resetPropertyFeatures: () => initialState,
  },
});

export const {
  setPropertyDetails,
  setLocationDetails,
  setRentAndBilling,
  setPropertyFeatures,
  setRulesAndRestrictions,
  setContactInfo,
  setImagesAndMedia,
  resetPropertyFeatures,
} = propertySlice.actions;

export default propertySlice.reducer;
