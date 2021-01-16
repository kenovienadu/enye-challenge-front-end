import { createContext } from "react";
import { makeAutoObservable } from "mobx";


class ProfilesState {
  allProfiles = [];
  filteredProfiles = [];
  searchQuery = '';
  filters = {
    male: true,
    female: true,
    otherGender: true,
    mastercard: true,
    visa: true
  };

  constructor() {
    makeAutoObservable(this);
  }

  search(value) {
    if (!value) { }

    this.searchQuery = value.toLowerCase();
    this.applyFilters();
  }

  get count() {
    return this.allProfiles.length
  }

  get pageCount() {
    const count = Math.floor(this.filteredProfiles.length / 20) + 1;
    return count;
  }

  toggleFilter(key) {
    const currentValue = this.filters[key];
    this.filters[key] = !currentValue;
  }

  applyFilters() {
    const filtersArray = [];
    const filterKeys = Object.keys(this.filters);

    filterKeys.forEach(key => {
      if (this.filters[key]) {
        filtersArray.push(key);
      }
    })

    const filtered = this.allProfiles.filter(profile => {
      return (filtersArray.includes(profile.Gender.toLowerCase()) && filtersArray.includes(profile.CreditCardType.toLowerCase()));
    })

    if (!this.searchQuery) {
      return this.filteredProfiles = [...filtered];
    }

    const value = this.searchQuery;
    this.filteredProfiles = [...filtered.filter(profile => profile.FirstName.toLowerCase().includes(value) || profile.LastName.toLowerCase().includes(value))];
  }

  findProfileByUsername(username, allProfiles) {
    const found = allProfiles.find(profile => profile.UserName === username) || null;
    return found;
  }

  async loadProfiles() {
    const endpoint = 'https://api.enye.tech/v1/challenge/records';
    try {
      const response = await fetch(endpoint)
      const data = await response.json();

      this.allProfiles = [...data.records.profiles];
      this.filteredProfiles = [...this.allProfiles];

      return true;
    } catch (error) {
      alert('Failed to Load Data');
      return false;
    }
  }
}

export const profilesState = new ProfilesState();
const ProfilesContext = createContext(profilesState);

export default ProfilesContext;