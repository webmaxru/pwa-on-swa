function Admin() {
  return (
    <main>
      <h1>Admin</h1>

      <p>You have to have <span className="code">administrator</span> custom role to access this page.</p>

      <pre>/account</pre>
      <a href="/account">Account</a>

      <br />
      <br />

      <pre>/.auth/logout</pre>
      <a href=".auth/logout">Log out</a>
    </main>
  );
}

export default Admin;
