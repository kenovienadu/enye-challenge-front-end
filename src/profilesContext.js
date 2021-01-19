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
    visa: true,
    otherCards: true
  };

  constructor() {
    makeAutoObservable(this);
  }

  search(value) {
    if (value) this.searchQuery = value.toLowerCase();

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
      if (this.filters[key] && (key !== 'otherGender')) {
        filtersArray.push(key);
      }
    })

    if (this.filters.otherGender) {
      filtersArray.push('prefer to skip');
    }

    const cardTypes = filtersArray.filter(filterItem => ['mastercard', 'visa', 'otherCards'].includes(filterItem));

    let filtered = this.allProfiles.filter(profile => filtersArray.includes(profile.Gender.toLowerCase()));

    filtered = filtered.filter(profile => {
      const otherCardsOnly = (cardTypes.length === 1) && (cardTypes[0] === 'otherCards');
      const creditCardType = profile.CreditCardType.toLowerCase();

      if (otherCardsOnly) {
        return !['mastercard', 'visa'].includes(creditCardType);
      }

      // If otherCards allowed, add card type to the list of cardTypes allowed
      if (cardTypes.includes('otherCards') && !cardTypes.includes(creditCardType)) {
        cardTypes.push(creditCardType);
      }

      return cardTypes.includes(creditCardType)
    });


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