import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Check,
  X,
  Loader,
  Filter,
  Search,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { backendurl } from "../App";

const Appointments = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendurl}/api/contacts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        setContacts(response.data.contacts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const response = await axios.put(
        `${backendurl}/api/contacts/status`,
        { contactId, status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        toast.success(`Contact marked as ${newStatus}`);
        fetchContacts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update contact status");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      searchTerm === "" ||
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || contact.status === filter;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "responded":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Contact Inquiries</h1>
            <p className="text-gray-600">Manage contact form submissions</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Contacts</option>
                <option value="pending">Pending</option>
                <option value="responded">Responded</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <motion.tr
                    key={contact._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <p className="font-medium text-gray-900">
                          {contact.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-2" />
                        <p className="text-gray-900">
                          {contact.email}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 max-w-xs truncate">
                      {contact.message}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                        <p className="text-gray-900">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {contact.status.charAt(0).toUpperCase() +
                          contact.status.slice(1)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {contact.status === "pending" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStatusChange(contact._id, "responded")}
                            className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(contact._id, "archived")}
                            className="p-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredContacts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No contacts found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;