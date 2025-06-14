#  Encrypted Dynamic Form – Backend

This is the backend service for the Encrypted Dynamic Form project, built using **Node.js** and **Express**. It securely encrypts form field metadata using **AES-256-CBC** and provides an API to serve encrypted form fields to the frontend. It also handles form submissions and includes a decoy field for added security.

---

##  Features

- AES-256-CBC encryption of form field definitions
- Random IV generation for each field
- Secure key derived using SHA-256 from a secret
- Includes a decoy field to prevent predictable structure
- Simple API for fetching encrypted fields and submitting form data

---