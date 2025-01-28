import { create } from 'zustand';

interface VotingState {
  eligibility: Array<string | { key: string; value: string }>; // Specify that eligibility is an array of strings
  selectedUVM: string[]; // Specify that understand Voting Method { selected } is an array of strings
  viewedUVM: string[]; // Specify that understand Voting Method { viewed } is an array of strings
  specialcaseFAQ: string[]; // Specify that special case FAQ is an array of strings
  gamifiedQuiz: string[]; // Specify that Gamified Quiz is an array of strings
  videoFullyWachted: boolean; // Specify that Gamified Quiz is an array of strings
  gamifiedQuizPlayed: boolean; // Specify that Gamified Quiz is an array of strings
  selectedFunFact: string[]; // Specify that fun facts{ selected } is an array of strings
  viewedFunFact: string[]; // Specify that fun facts { viewed } is an array of strings
  funFactShowMore: boolean; // Specify that fun facts has been show more
  checkListFunFact: string[]; // Specify that fun facts checklist is an array of strings
  addOrUpdateEligibility: (key: string, value: string) => void; // add or update eligibility
  addOrUpdateSelectedUVM: (type: string, item: string) => void; // add or update { selected } Understand Voting Method 
  addOrUpdateViewedUVM: (item: string) => void; // add or update { viewed } Understand Voting Method
  addOrUpdateSpecialCaseFAQ: (items: string[]) => void; // add or update { viewed } Understand Voting Method
  addOrUpdateGamifiedQuiz: (value: string, index?: number) => void; // add or update eligibility
  addOrUpdateVideoFullyWachted: (value: boolean) => void; // add or update Find My Polling Station Video Fully Watched
  addOrUpdateGamifiedQuizPlayed: (value: boolean) => void; // add or update Gamified Quiz Played
  addOrUpdateSelectedFunFact: (type: string, item: string) => void; // add or update { selected } Understand Voting Method 
  addOrUpdateViewedFunFact: (item: string) => void; // add or update { viewed } Understand Voting Method
  addFunFactShowMore: (value: boolean) => void; // add or update { show more } Fun Fact show more
  addOrUpdateFunFactCheckList: (item: string) => void; // add item to Fun Fact CheckList
}

const useVotingStore = create<VotingState>()((set) => ({
	eligibility: [],
	selectedUVM: [],
	viewedUVM: [],
	specialcaseFAQ: [],
	gamifiedQuiz: [],
	videoFullyWachted: false,
	gamifiedQuizPlayed: false,
	selectedFunFact: [],
	viewedFunFact: [],
	funFactShowMore: false,
	checkListFunFact: [],
	addOrUpdateEligibility: (key: string, value: string) =>
	  set((state) => {
		// Check if the key already exists in the eligibility array
		const existingIndex = state.eligibility.findIndex(item => {
		  // Check if item is an object and has a 'key' property
		  return typeof item !== 'string' && item.key === key;
		});

		if (existingIndex !== -1) {
		  // If the key exists, update the value
		  const updatedEligibility = [...state.eligibility];
		  updatedEligibility[existingIndex] = { key, value };

		  return { eligibility: updatedEligibility };
		} else {
		  // If the key doesn't exist, add the new key-value pair
		  return {
			eligibility: [...state.eligibility, { key, value }],
		  };
		}
	  }
	),
		// Add or update selected UVM
	addOrUpdateSelectedUVM: (type, item) =>
		set((state) => {
			if(type === 'add'){
				if (!state.selectedUVM.includes(item)) {
					return {
					  selectedUVM: [...state.selectedUVM, item], // Add item if it doesn't exist
					};
				}
			}else{
				return {
					selectedUVM: state.selectedUVM.filter((uvm) => uvm !== item), // Remove item if it exists
				};
			}
			return state; // Return state unchanged if item already exists
		}
	),
	// Add or update viewed UVM
	addOrUpdateViewedUVM: (item) =>
		set((state) => {
			if (!state.viewedUVM.includes(item)) {
				return {
				  viewedUVM: [...state.viewedUVM, item], // Add item if it doesn't exist
				};
			}
			return state; // Return state unchanged if item already exists
		}
	),
	// Replace special case FAQ with new items
	addOrUpdateSpecialCaseFAQ: (items) =>
		set(() => ({
			specialcaseFAQ: [...items], // Replace the old state with new items
		})
	),
	//Add update Gamified Quiz
	addOrUpdateGamifiedQuiz: (value: string, index?: number) =>
		set((state) => {
			if (typeof index === 'number' && index >= 0) {
			  // If index is valid, check if value already exists at the specified index
			  if (state.gamifiedQuiz[index] === value) {
				console.log('Value already exists at the index.');
				return state; // No change if the value is the same
			  }
			  // Update the value at the specified index
			  const updatedQuiz = [...state.gamifiedQuiz];
			  updatedQuiz[index] = value;
			  return { gamifiedQuiz: updatedQuiz };
			} else if (!state.gamifiedQuiz.includes(value)) {
			  // Add the value if it doesn't exist in the array
			  return {
				gamifiedQuiz: [...state.gamifiedQuiz, value],
			  };
			}
			return state; // Return current state if no action is performed
		}
	),
	// Replace Find My Polling Station Video Fully Watched
	addOrUpdateVideoFullyWachted: (value) =>
		set(() => ({
			videoFullyWachted: value,
		})
	),
	// Replace Gamified Quiz Played
	addOrUpdateGamifiedQuizPlayed: (value) =>
		set(() => ({
			gamifiedQuizPlayed: value,
		})
	),
	// Add or update selected Fun Fact
	addOrUpdateSelectedFunFact: (type, item) =>
		set((state) => {
			if(type === 'add'){
				if (!state.selectedFunFact.includes(item)) {
					return {
					  selectedFunFact: [...state.selectedFunFact, item], // Add item if it doesn't exist
					};
				}
			}else{
				return {
					selectedFunFact: state.selectedFunFact.filter((ff) => ff !== item), // Remove item if it exists
				};
			}
			return state; // Return state unchanged if item already exists
		}
	),
	// Add or update viewed Fun Fact
	addOrUpdateViewedFunFact: (item) =>
		set((state) => {
			if (!state.viewedFunFact.includes(item)) {
				return {
				  viewedFunFact: [...state.viewedFunFact, item], // Add item if it doesn't exist
				};
			}
			return state; // Return state unchanged if item already exists
		}
	),
	// Replace Find My Polling Station Video Fully Watched
	addFunFactShowMore: (value) =>
		set(() => ({
			funFactShowMore: value,
		})
	),
	// Add or update Fun Fact To Check List
	addOrUpdateFunFactCheckList: (item) =>
		set((state) => {
			if (!state.checkListFunFact.includes(item)) {
				return {
				  checkListFunFact: [...state.checkListFunFact, item], // Add item if it doesn't exist
				};
			}
			return state; // Return state unchanged if item already exists
		}
	),
}));

export default useVotingStore;