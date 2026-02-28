import { useState, useEffect } from "react";
import { Phone, Plus, Trash2, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const EmergencyContacts = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("Family");

  const fetchContacts = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("emergency_contacts")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  const addContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("emergency_contacts").insert({
      user_id: user.id,
      name,
      phone,
      relationship,
    });
    if (error) {
      toast.error("Failed to add contact");
    } else {
      toast.success("Contact added");
      setName("");
      setPhone("");
      setAdding(false);
      fetchContacts();
    }
  };

  const deleteContact = async (id: string) => {
    const { error } = await supabase.from("emergency_contacts").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete contact");
    } else {
      toast.success("Contact removed");
      fetchContacts();
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-card-foreground">Emergency Contacts</h3>
        </div>
        {contacts.length < 3 && (
          <button
            onClick={() => setAdding(!adding)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            {adding ? <Trash2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        )}
      </div>

      {contacts.length >= 3 && !adding && (
        <p className="text-xs text-muted-foreground text-center mb-3">Maximum 3 contacts reached.</p>
      )}

      {adding && contacts.length < 3 && (
        <form onSubmit={addContact} className="mb-4 space-y-3 p-4 rounded-lg bg-secondary/50 border border-border">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contact name"
            required
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            required
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {["Family", "Friend", "Partner", "Colleague", "Other"].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-gradient-primary text-primary-foreground py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <UserPlus className="inline h-4 w-4 mr-1 -mt-0.5" /> Add Contact
          </button>
        </form>
      )}

      {contacts.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No emergency contacts yet.</p>
      ) : (
        <div className="space-y-2">
          {contacts.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
              <div>
                <p className="text-sm font-medium text-card-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.relationship} · {c.phone}</p>
              </div>
              <button
                onClick={() => deleteContact(c.id)}
                className="p-1.5 rounded hover:bg-danger/20 text-muted-foreground hover:text-danger transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmergencyContacts;
