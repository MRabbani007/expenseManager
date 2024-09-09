import { useGetUsersQuery } from "@/features/admin/AdminApiSlice";

export default function AdminUsers() {
  const { data, isLoading, isSuccess, isError } = useGetUsersQuery(null);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error loading users</p>;
  } else if (isSuccess) {
    content = Array.isArray(data)
      ? data.map((user, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <img src="images/income.png" />
            <div>
              <p className="font-bold text-zinc-900">{user?.username}</p>
              <p>
                <span>{user?.firstname}</span>
                <span>{user?.lastname}</span>
              </p>
              <p>{user?.email}</p>
              <p>
                <span>{user?.createdAt?.substring(0, 10)}</span>
                <span>{user?.updatedAt?.substring(0, 10)}</span>
              </p>
            </div>
          </div>
        ))
      : null;
  }

  return (
    <main>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Users</h1>
      </header>
      {content}
    </main>
  );
}
