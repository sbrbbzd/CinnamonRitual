# Notification Modal Redesign Implementation Plan

## Objective
Update the `SetReminderModal` to match the design of `LanguageModal` and introduce toggle switches for individual notification times (Morning, Afternoon, Evening).

## Design Specification
- **Visual Style**: Mimic `LanguageModal`.
    - Modal Overlay: Dark transparent background.
    - Content Container: Earth Clay background, gold borders, rounded corners.
    - Title: Gold, uppercase, letter-spaced.
    - Options: Row with text on left and switch on right.
- **Interactivity**: 
    - Use `Switch` component for toggling.
    - Instant update of settings in `useAppStore`.
    - Reschedule reminders immediately upon toggle.

## Implementation Steps
1.  **Analyze Existing Components**:
    - `LanguageModal.tsx`: Reference for styling (colors, layout).
    - `SetReminderModal.tsx`: Target for modification.
2.  **Refactor `SetReminderModal.tsx`**:
    - Update `styles` to match `LanguageModal` using `colors` and `spacing`.
    - Replace generic logic with `toggleReminder` function.
    - Implement `Switch` for Morning, Afternoon, and Evening.
    - Remove "All" option and "Confirm" button in favor of instant toggles.
    - Ensure logical "Enabled" state update (if any time is on, enabled is true).

## Status
- [x] Analysis
- [x] Refactoring `SetReminderModal.tsx`
- [x] Verification (Code review)
