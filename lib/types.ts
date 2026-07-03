export type FilterType = 'retro' | 'vintage' | 'minimal' | 'sunset';
export type Postcard = { id:string; sender_id:string; recipient_name:string; recipient_contact:string; photo_url:string; filter_type:FilterType; caption:string; note:string; location_name:string; lat:number; lng:number; created_at:string; opened_at:string|null };
export const filters: {id:FilterType; label:string; description:string}[] = [
 {id:'retro',label:'70s Retro',description:'golden warmth and faded holiday color'},
 {id:'vintage',label:'1930s Vintage',description:'soft sepia and heirloom paper tones'},
 {id:'minimal',label:'Modern Minimal',description:'clean muted gallery color'},
 {id:'sunset',label:'Rust Sunset',description:'orange glow with travel-diary warmth'}
];
