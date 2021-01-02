using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BikeRental.Models;

namespace BikeRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BikeDetailsController : ControllerBase
    {
        private readonly BikeDetailContext _context;

        public BikeDetailsController(BikeDetailContext context)
        {
            _context = context;
        }

        // GET: api/BikeDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BikeDetail>>> GetBikeDetails()
        {
            return await _context.BikeDetails.ToListAsync();
        }

        // GET: api/BikeDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BikeDetail>> GetBikeDetail(int id)
        {
            var bikeDetail = await _context.BikeDetails.FindAsync(id);

            if (bikeDetail == null)
            {
                return NotFound();
            }

            return bikeDetail;
        }
       
        // PUT: api/BikeDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBikeRent(int id, BikeDetail bikeDetail)
        {
            if (id != bikeDetail.BikeId)
            {
                return BadRequest();
            }

            _context.Entry(bikeDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BikeDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/BikeDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BikeDetail>> PostBikeDetail(BikeDetail bikeDetail)
        {
            _context.BikeDetails.Add(bikeDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBikeDetail", new { id = bikeDetail.BikeId }, bikeDetail);
        }

        // DELETE: api/BikeDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBikeDetail(int id)
        {
            var bikeDetail = await _context.BikeDetails.FindAsync(id);
            if (bikeDetail == null)
            {
                return NotFound();
            }

            _context.BikeDetails.Remove(bikeDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BikeDetailExists(int id)
        {
            return _context.BikeDetails.Any(e => e.BikeId == id);
        }
    }
}
