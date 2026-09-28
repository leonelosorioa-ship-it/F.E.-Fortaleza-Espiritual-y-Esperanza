# Security Specification: Tu Poder Mental • F.E.™ Firebase Access Control

## 1. Data Invariants

1. **User Isolation**: A user can only read, write, and list documents within their own `/users/{userId}` document and subcollections (`savedAnchors`, `gratitudeEntries`, `chatHistory`).
2. **Identity Immutability**: Any document created under `/users/{userId}` must have its `userId` property match `request.auth.uid`. During updates, `userId` cannot be modified.
3. **Verified Authentication**: Writes require an authenticated user (`request.auth != null`).
4. **Length and Type Hardening**: All string fields are constrained with max lengths, and array fields are strictly bounded (e.g., `items.size() <= 5`).
5. **No Blind Blanket Reads**: There are no root-level collection reads; queries must target subcollections owned by `request.auth.uid`.

---

## 2. The "Dirty Dozen" Malicious Payloads

1. **Spoofed User ID on Profile Create**:
   Attempting to create `/users/victim_user_123` with `request.auth.uid == 'attacker_456'`.
   *Expected*: PERMISSION_DENIED.

2. **Shadow Field Injection on Profile Update**:
   Attempting to inject `{ "isAdmin": true, "vipAccess": true }` into `/users/{userId}`.
   *Expected*: PERMISSION_DENIED.

3. **Oversized String Payload in SavedAnchor**:
   Sending `declaration` with 50,000 characters to exhaust database quota.
   *Expected*: PERMISSION_DENIED.

4. **ID Poisoning Attack**:
   Attempting to write with anchorId containing path traversal characters like `../../admin/token`.
   *Expected*: PERMISSION_DENIED.

5. **Cross-User Anchor Read**:
   User A trying to `get` `/users/UserB/savedAnchors/anchor_99`.
   *Expected*: PERMISSION_DENIED.

6. **Unauthenticated Gratitude Entry Write**:
   Unauthenticated client trying to create `/users/anon/gratitudeEntries/entry_1`.
   *Expected*: PERMISSION_DENIED.

7. **Gratitude Array Flooding**:
   Attempting to save `items: ['1', '2', ..., 500 items]` to cause Denial of Wallet.
   *Expected*: PERMISSION_DENIED.

8. **Chat Message Role Spoofing as System/Admin**:
   Sending role `system_god_mode` instead of `user` or `model`.
   *Expected*: PERMISSION_DENIED.

9. **Altering userId on SavedAnchor Update**:
   Attempting to reassign an anchor's ownership by changing `userId: "other_user"`.
   *Expected*: PERMISSION_DENIED.

10. **Query Scraping Without Owner Scope**:
    Issuing a collection group query or non-scoped list to read all chat logs.
    *Expected*: PERMISSION_DENIED.

11. **Chat Content Null/Boolean Value Poisoning**:
    Sending `{ "content": true }` or `{ "content": null }` to crash parsing systems.
    *Expected*: PERMISSION_DENIED.

12. **Blanket Collection Traversal**:
    Attempting to list `/users` collection without user document specification.
    *Expected*: PERMISSION_DENIED.

---

## 3. Test Runner Definition

The test suite validates that unauthenticated or mismatched identity requests fail with `PERMISSION_DENIED` across all endpoints.
