import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTickets, deleteTicket, api } from '../../store/ticketsSlice';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { Clock, Search, Filter } from 'lucide-react';
import { TicketCategory, TicketPriority, TicketStatus } from '../store/ticketsSlice';

const ListTickets = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(state => state.tickets.tickets);

  useEffect(() => {
    if(tickets.length==0){
        api.get('/tickets')
      .then(res => dispatch(setTickets(res.data)));
    }
  }, [dispatch]);
  console.log(tickets)

return (
    <Layout>
      <div className="container py-4">
        <div className="mb-4">
          <h1>Liste des Tickets</h1>
          <p className="text-muted">{filteredTickets.length} ticket(s) trouvé(s)</p>
        </div>

        {/* Filters */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex align-items-center gap-2 mb-4">
              <Filter size={20} />
              <h5 className="mb-0">Filtres</h5>
            </div>

            <div className="row g-3">
              {/* Search */}
              <div className="col-md-6 col-lg-3">
                <label className="form-label">Recherche</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher..."
                    className="form-control"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="col-md-6 col-lg-3">
                <label className="form-label">Catégorie</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as TicketCategory | 'Tous')}
                  className="form-select"
                >
                  <option value="Tous">Toutes</option>
                  <option value="Technique">Technique</option>
                  <option value="Matériel">Matériel</option>
                  <option value="Compte">Compte</option>
                  <option value="Facturation">Facturation</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div className="col-md-6 col-lg-3">
                <label className="form-label">Priorité</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as TicketPriority | 'Tous')}
                  className="form-select"
                >
                  <option value="Tous">Toutes</option>
                  <option value="Basse">Basse</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Haute">Haute</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="col-md-6 col-lg-3">
                <label className="form-label">Statut</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as TicketStatus | 'Tous')}
                  className="form-select"
                >
                  <option value="Tous">Tous</option>
                  <option value="Nouveau">Nouveau</option>
                  <option value="En cours">En cours</option>
                  <option value="Résolu">Résolu</option>
                  <option value="Fermé">Fermé</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Ticket</th>
                  <th>Client</th>
                  <th>Catégorie</th>
                  <th>Priorité</th>
                  <th>Statut</th>
                  <th>Temps écoulé</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-5 text-muted">
                      Aucun ticket trouvé
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map(ticket => (
                    <tr key={ticket.id}>
                      <td>
                        <div>
                          <h6 className="mb-1">{ticket.title}</h6>
                          <p className="text-muted mb-0 small line-clamp-1">{ticket.description}</p>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div>{ticket.clientName}</div>
                          <small className="text-muted">{ticket.clientEmail}</small>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getCategoryBadgeClass(ticket.category)}`}>
                          {ticket.category}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Clock size={16} className="text-muted" />
                          <span>{getElapsedTime(ticket.createdAt)}</span>
                          {isOverdue(ticket.createdAt, ticket.status) && (
                            <span className="badge bg-danger">Retard</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <Link
                          to={`/tickets/${ticket.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Détails
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListTickets;
