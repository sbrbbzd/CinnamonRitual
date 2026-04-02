# Onboarding Reminder Flow Implementation Plan

## Objective
Update the onboarding flow to prompt the user to set a reminder immediately after they enter their name and language during the initial setup.

## Current Flow
1. User enters Name.
2. User selects Language.
3. User presses "BEGIN".
4. App navigates to Main Screen.

## New Flow
1. User enters Name.
2. User selects Language.
3. User presses "BEGIN".
4. **App saves user profile.**
5. **App displays "Set Reminder Modal"** (Morning/Afternoon/Evening toggles).
6. User sets reminders (optional) and dismisses the modal.
7. App navigates to Main Screen.

## Implementation Details
### `OnboardingScreen.tsx`
- Import `SetReminderModal`.
- Add local state `showReminderModal`.
- In `handleContinue`:
    - Save user profile (`onboardingComplete: true`).
    - Set `showReminderModal(true)`.
    - Do NOT call `onComplete()` immediately.
- Add `handleReminderClose`:
    - Set `showReminderModal(false)`.
    - Call `onComplete()` to trigger navigation to Main Screen.
- Render `SetReminderModal` with `visible={showReminderModal}` and `onClose={handleReminderClose}`.

## Status
- [x] Implementation
- [x] Verification
