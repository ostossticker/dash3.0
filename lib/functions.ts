 // Function to check if two strings are anagrams
 export const areAnagrams = (str1: string, str2: string) => {
    const normalize = (str: string) => str.replace(/[^\w]/g, '').toLowerCase();
    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);

    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }

    const charCount: Record<string, number> = {};

    for (const char of normalizedStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (const char of normalizedStr2) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }

    return true;
};

export const openModal = (id:string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  export const closeModal = (id:string) => {
    const modal = document.getElementById(id as string) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  export const fetchData = async (url:string) =>{
    const res = await fetch(url);
    return res.json()
  }



  export const areSimilarWithTolerance = (str1: string, str2: string, tolerance: number = 1): boolean => {
    const levenshteinDistance = (s1: string, s2: string): number => {
      const m = s1.length;
      const n = s2.length;
      const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
      for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
          if (i === 0) {
            dp[i][j] = j;
          } else if (j === 0) {
            dp[i][j] = i;
          } else if (s1[i - 1] === s2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1];
          } else {
            dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
          }
        }
      }
  
      return dp[m][n];
    };
  
    const substrings = new Set<string>();
  
    // Generate all substrings of str1
    for (let i = 0; i < str1.length; i++) {
      for (let j = i + 1; j <= str1.length; j++) {
        substrings.add(str1.substring(i, j));
      }
    }
  
    // Check if any substring of str1 is similar to str2
    for (const substring of substrings) {
      const distance = levenshteinDistance(substring, str2);
      console.log(`Comparing "${substring}" with "${str2}", Levenshtein distance: ${distance}`);
      if (distance <= tolerance) {
        console.log(`Found similar strings: "${substring}" and "${str2}"`);
        return true;
      }
    }
  
    return false;
  };

  export const fuzzyMisspellingCorrection = (input: string, data: string[]): string | null => {
    // Iterate over the data array and check if any item is similar to the input with tolerance
    for (const item of data) {
        console.log(`Comparing "${input}" with "${item}"`);
        const isSimilar = areSimilarWithTolerance(input, item);
        console.log(`Similarity: ${isSimilar}`);
        if (isSimilar) {
            console.log(`Corrected Filter: ${item}`);
            return item; // Return the corrected value
        }
    }
    console.log("Corrected Filter: null");
    return null; // Return null if no match is found
};