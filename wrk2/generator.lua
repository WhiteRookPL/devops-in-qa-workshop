-- Commons and Utils.

function load_csv(file)
  lines = {}

  local f = io.open(file, "r")

  if f ~= nil then
    io.close(f)
  else
    return lines
  end

  for line in io.lines(file) do
    if not (line == '') then
      lines[#lines + 1] = line
    end
  end

  return lines
end

function file_slurp(path)
    local f = io.open(path)
    local s = f:read("*a")
    f:close()
    return s
end

function interp(s, tab)
  return (s:gsub("($%b{})", function(w) return tab[w:sub(3, -2)] or w end))
end

function randomize_and_trim(tab)
  return tab[math.random(#tab)]:gsub("^%s*(.-)%s*$", "%1")
end

function uuid()
    local template ='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

    return string.gsub(template, '[xy]', function (c)
        local v = (c == 'x') and math.random(0, 0xf) or math.random(8, 0xb)
        return string.format('%x', v)
    end)
end

-- Preparing requests.

math.randomseed(os.time())

ids = load_csv("IDS.csv")

template = file_slurp("./template.json")

print("[ii] Found " .. #ids .. " IDs.")
print("[ii] File 'template.json' read.")

function get_body()
  id = randomize_and_trim(ids)
  guid = uuid()

  return interp(template, { id = id, guid = guid })
end

-- Generating requests.

function request()
  url = "/example/v1"

  wrk.method = "POST"

  wrk.headers["User-Agent"] = "wrk2"
  wrk.headers["Connection"] = "keep-alive"
  wrk.headers["Content-Type"] = "application/json"

  wrk.body = get_body()

  return wrk.format(nil, url)
end

-- Preparing summary of the test round.

function done(summary, latency, requests)
   io.write("------------------------------\n")
   io.write(string.format("- Throughput: %.2f request / s\n", (summary.requests / summary.duration) * 1000000))
   io.write("- Latency:\n")
   for _, p in pairs({ 50, 90, 99, 99.9, 99.99, 99.999 }) do
      n = latency:percentile(p)
      io.write(string.format("  - %g%% = %.3f ms\n", p, n / 1000))
   end
end