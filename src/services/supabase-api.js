import {supabase} from "../../supabase.js";

async function getAllAccounts() {
    try {
        const {data, error} = await supabase
            .from('account')
            .select('*');
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            return data;
        }
    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

async function getAccountById(id) {
    try {
        const {data, error} = await supabase
            .from('account')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            return data;
        }
    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

export default {
    getAllAccounts,
    getAccountById,
}
