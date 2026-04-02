# Set Reminder Modal Persistence Update

## Objective
Update the `SetReminderModal` component to ensure it only closes when the user explicitly saves their changes. This prevents accidental closures when clicking outside the modal or using the hardware back button.

## Implementation Details

### File Modified
- `src/components/SetReminderModal.tsx`

### Changes
1.  **Backdrop Interaction**:
    - Removed the `onPress={onClose}` handler from the background `TouchableOpacity`.
    - This ensures that tapping the semi-transparent background does not dismiss the modal.

2.  **Hardware Back Button (Android)**:
    - Updated `onRequestClose` prop on the `<Modal>` component.
    - Changed from `onRequestClose={onClose}` to `onRequestClose={() => {}}`.
    - This prevents the standard Android back button from dismissing the modal, enforcing the "Save" action flow.

## Conclusion
The modal now requires a positive action (clicking "SAVE") to close, ensuring distinct user intent for setting reminders.
