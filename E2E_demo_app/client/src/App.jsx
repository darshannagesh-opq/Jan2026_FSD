import { useState, useEffect } from "react";

// API base URL comes from a Vite env variable so it can change on deploy.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EMPTY = { name: "", email: "", phone: "" };

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState(EMPTY);   // the "add contact" form
  const [editId, setEditId] = useState(null); // id of the row being edited
  const [editForm, setEditForm] = useState(EMPTY);

  // Load all contacts once when the page opens.
  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    const res = await fetch(`${API_URL}/api/contacts`);
    const data = await res.json();
    setContacts(data);
  }

  // --- Add ---------------------------------------------------------------
  async function addContact(e) {
    e.preventDefault();
    await fetch(`${API_URL}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(EMPTY);
    loadContacts();
  }

  // --- Delete ------------------------------------------------------------
  async function deleteContact(id) {
    await fetch(`${API_URL}/api/contacts/${id}`, { method: "DELETE" });
    loadContacts();
  }

  // --- Edit --------------------------------------------------------------
  function startEdit(contact) {
    setEditId(contact.id);
    setEditForm({ name: contact.name, email: contact.email, phone: contact.phone });
  }

  function cancelEdit() {
    setEditId(null);
    setEditForm(EMPTY);
  }

  async function saveEdit(id) {
    await fetch(`${API_URL}/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    cancelEdit();
    loadContacts();
  }

  return (
    <div>
      <h1>Contacts</h1>

      {/* Add form */}
      <form onSubmit={addContact}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) =>
            editId === c.id ? (
              // Row in edit mode
              <tr key={c.id}>
                <td>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                </td>
                <td>
                  <div className="row-actions">
                    <button onClick={() => saveEdit(c.id)}>Save</button>
                    <button className="secondary" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              // Normal row
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => startEdit(c)}>
                      Edit
                    </button>
                    <button className="danger" onClick={() => deleteContact(c.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
