import { useState } from "react"
import { routes } from "./routesList"
import GitHub from './assets/github.png'

const App = () => {
  const [sortType, setSortType] = useState('address')
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = (type: string) => {
    if (type === sortType) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortOrder('asc');
    }
  }

  function makeIpSortable(ip: string) {
    return ip
      .split('.')
      .join('');
  }

  const sortedRoutes = [...routes].sort((a, b) => {
    let aValue = ''
    let bValue = ''

    if (sortType === 'address') {
      aValue = makeIpSortable(a.address)
      bValue = makeIpSortable(b.address)
    } else if (sortType === 'gateway') {
      aValue = makeIpSortable(a.gateway)
      bValue = makeIpSortable(b.gateway)
    } else if (sortType === 'interface') {
      aValue = a.interface;
      bValue = b.interface;
    }
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  })
  return (
    <main className="main">
      <h1>Действующие маршруты IPv4</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('address')} className={sortType === 'address' ? 'active' : ''}>
              Адрес назначения {sortType === 'address' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('gateway')} className={sortType === 'gateway' ? 'active' : ''}>
              Шлюз {sortType === 'gateway' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('interface')} className={sortType === 'interface' ? 'active' : ''}>
              Интерфейс {sortType === 'interface' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRoutes.map((route) => (
            <tr key={route.uuid}>
              <td>{`${route.address}/${route.mask}`}</td>
              <td>{route.gateway}</td>
              <td>{route.interface}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a className="github" href="https://github.com/vLimovs" target="_blank">
        <img src={GitHub} />
      </a>
    </main>
  )
}

export default App