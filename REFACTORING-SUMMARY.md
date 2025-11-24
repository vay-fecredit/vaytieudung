# Code Refactoring Documentation

## Overview
This document describes the code duplication refactoring performed on the Shinhan Finance application.

## Problem Statement
The codebase contained significant code duplication across multiple JavaScript files:

1. **scripts.js** and **loan-registration.js** - Nearly identical files (278 and 279 lines)
2. **shared.js** - Contained duplicate implementations of number formatting functions
3. **ekyc-app.js** and **ekyc-app-complete.js** - Very similar files with minor differences

## Solution

### 1. Created Shared Utilities Module (`assets/js/utils.js`)

A new centralized utilities module was created containing all common functions:

- **Number Formatting**
  - `formatNumber(number)` - Format numbers with Vietnamese locale
  - `formatNumberInput(value)` - Format input values by removing non-digits
  - `unformatNumber(value)` - Convert formatted strings back to numbers

- **ID/Code Generation**
  - `generateContractId()` - Generate unique contract IDs (format: SHB-YYYYMMDD-XXXXXX)
  - `generateRandomCode()` - Generate 6-digit random codes
  - `generateLoanCode()` - Generate unique loan codes

- **Date Utilities**
  - `getCurrentDate()` - Get current date in DD/MM/YYYY format
  - `getDateComponents(dateStr)` - Parse date string into components

- **Financial Calculations**
  - `calculateInterestRate(loanAmount)` - Calculate interest rate based on loan amount
  - `calculateMonthlyPayment(loanAmount, loanTerm, annualInterestRate)` - Calculate monthly loan payment

### 2. Refactored Existing Files

#### scripts.js
- **Before**: 278 lines
- **After**: 203 lines
- **Reduction**: 75 lines (27% smaller)
- **Changes**: Removed 9 duplicate utility functions, added dependency note

#### loan-registration.js
- **Before**: 279 lines  
- **After**: 204 lines
- **Reduction**: 75 lines (27% smaller)
- **Changes**: Removed 9 duplicate utility functions, added dependency note

#### shared.js
- **Changes**: Updated `formatNumber` to provide backward compatibility with the old DOM element-based API while delegating to the new utils.js implementation
- **Note**: Removed duplicate `unformatNumber` implementation

#### ekyc-app.js
- **Changes**: Added lazy loading functions (`loadTesseract` and `loadFaceAPI`) to match ekyc-app-complete.js
- **Note**: Both eKYC files appear to be incomplete/truncated in the repository (end abruptly mid-function)

## Total Impact

- **Lines of Code Removed**: ~150 lines of duplication
- **Files Created**: 1 new utilities module + 1 test file
- **Files Modified**: 4 files refactored
- **Maintainability**: Significantly improved - utility functions now have single source of truth

## Usage

To use the refactored code, ensure `utils.js` is loaded before any dependent scripts:

```html
<!-- Load utilities first -->
<script src="assets/js/utils.js"></script>

<!-- Then load dependent scripts -->
<script src="assets/js/scripts.js"></script>
<script src="assets/js/loan-registration.js"></script>
<script src="assets/js/shared.js"></script>
```

## Testing

Unit tests have been added in `tests/utils.test.js` covering all utility functions.

To run tests:
```bash
npm test
```

## Known Issues

1. **eKYC Files Incomplete**: Both `ekyc-app.js` and `ekyc-app-complete.js` appear to be truncated/incomplete in the repository:
   - `ekyc-app.js`: Ends at line 629 without closing braces
   - `ekyc-app-complete.js`: Ends at line 621 with incomplete function `startAdvancedF`
   
   **Recommendation**: These files should be reviewed and completed before deployment.

2. **HTML Files Not Updated**: HTML files that use these scripts need to be updated to include utils.js. This should be done as part of deployment.

## Benefits

1. **DRY Principle**: Eliminated duplication of utility functions
2. **Maintainability**: Changes to utilities need only be made in one place
3. **Testability**: Centralized utilities are easier to test
4. **Documentation**: All utilities are now properly documented with JSDoc comments
5. **Code Size**: Reduced overall codebase size by ~150 lines
6. **Consistency**: All parts of the application now use the same implementations

## Migration Checklist

- [x] Create utils.js with all common functions
- [x] Refactor scripts.js to use utils.js
- [x] Refactor loan-registration.js to use utils.js
- [x] Update shared.js for backward compatibility
- [x] Update ekyc-app.js with lazy loading functions
- [x] Create unit tests for utilities
- [ ] Update HTML files to include utils.js
- [ ] Fix incomplete eKYC files
- [ ] Run full test suite
- [ ] Update deployment scripts if needed
