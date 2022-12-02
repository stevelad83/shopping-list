const SUPABASE_URL = 'https://yhtqjrmxupxpmxmjrqpo.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlodHFqcm14dXB4cG14bWpycXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgyNTQsImV4cCI6MTk4MzY4NDI1NH0.Bp6AKfoL4GrrPbg0WYAwHMhKSaKZFGfEYwaewQNhY4M';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function getAllItems() {
    const response = await client
        .from('groceries')
        .select('*')
        .match({ user_id: client.auth.user().id });

    return checkError(response);
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('./auth');
}

/* Data functions */

export async function createItem(item, quantity) {
    const response = await client
        .from('groceries')
        .insert({ item: item, quantity: quantity, user_id: client.auth.user().id });
}

export async function buyItem(id) {
    const response = await client
        .from('groceries')
        .update({ bought: true })
        .match({ user_id: client.auth.user().id, id: id });
    return checkError(response);
}

export async function deleteAllItems() {
    const response = await client
        .from('groceries')
        .delete()
        .match({ user_id: client.auth.user().id });
    return checkError(response);
}

function checkError({ data, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : data;
}
